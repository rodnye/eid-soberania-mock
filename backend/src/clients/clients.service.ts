import { Injectable } from '@nestjs/common';

interface ClientRegister {
  clientId: string;
  domain: string;
}

const clientsMock: ClientRegister[] = [
  {
    clientId: 'decidimos-app',
    domain: 'decidimos.onrender.com',
  },

  {
    clientId: 'localhost',
    domain: 'localhost',
  },
];

@Injectable()
export class ClientsService {
  findOne(clientId: string) {
    return clientsMock.find((client) => client.clientId === clientId);
  }

  /**
   * Verify if client exists
   */
  verifyClientId(clientId: string) {
    return this.findOne(clientId) !== undefined;
  }

  /**
   * Verify if the provided redirect_url is the same domain of the client
   */
  verifyClientUrl(clientId: string, url: string): boolean {
    const client = this.findOne(clientId);
    if (!client) throw new Error('Client not found');

    const domain = client.domain;
    const protocolRegx = /^https?:\/\//;

    if (!protocolRegx.test(url)) {
      throw new Error('Invalid URL format');
    }

    const partialUrl = url
      .replace(protocolRegx, '')
      .split('/')[0]
      .split(':')[0];

    return partialUrl === domain || partialUrl.endsWith(`.${domain}`);
  }
}
