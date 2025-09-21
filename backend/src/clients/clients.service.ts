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
  verifyClientUrl(clientId: string, url: string) {
    const client = this.findOne(clientId);
    if (!client) throw new Error('Client not found');

    const domain = client.domain;
    let partialUrl = url;
    const protocolRegx = /^https{0,1}:\/\//;

    if (protocolRegx.exec(url)) {
      partialUrl = url.replace(protocolRegx, '');

      partialUrl = partialUrl
        //obtener dominio
        .split('/')[0]
        // obtener segmento antes del puerto
        .split(':')[0];

      if (partialUrl.lastIndexOf(domain) === partialUrl.length - domain.length)
        return true;
    }
    return false;
  }
}
