declare module 'proskomma' {
  export class Proskomma {
    importDocument(
      selectors: object,
      contentType: string,
      contentString: string
    ): any;

    gqlQuery(
      query: string,
      callback?: (result: any) => any

    ): Promise<any>;
  }
}
