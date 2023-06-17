export default class DBManager {
  async getData(serviceURL: string, rawBody: any) {
    console.log('----------------------------------');
    console.log('--          getData             --');
    console.log('-- rawBody', rawBody);
    console.log('-- serviceURL', serviceURL);
    console.log('----------------------------------');

    try {
      var myHeaders = new Headers();
      myHeaders.append('Content-Type', 'application/json');

      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: rawBody,
        redirect: 'follow',
      };

      const result = await fetch(
        `https://shift-mate-crud.vercel.app/api/${serviceURL}`,
        requestOptions,
      )
        .then(response => response.text())
        .then(data => {
          return data;
        })
        .catch(error => console.log('error', error));
      return result;
    } catch (error) {
      console.log('error---->', error);
    }
  }
}
