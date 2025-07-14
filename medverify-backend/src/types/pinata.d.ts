declare module '@pinata/sdk' {
  interface PinataPinResponse {
    IpfsHash: string;
    PinSize: number;
    Timestamp: string;
  }
  
  class PinataSDK {
    constructor(apiKey: string, secretApiKey: string);
    pinJSONToIPFS(body: any): Promise<PinataPinResponse>;
    pinFileToIPFS(readableStream: any): Promise<PinataPinResponse>;
  }
  
  export = PinataSDK;
}