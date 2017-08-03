
import { Headers, RequestOptions } from '@angular/http';

// export function xhrHeaders() {
//     const headers = new Headers();
//     headers.append('Content-Type', 'application/json; charset=utf-8');
//     headers.append('X-Requested-With','XMLHttpRequest');
//     return {headers};
// }

export function xhrHeaders() {
  const headers = new Headers({ 'Access-Control-Allow-Origin': '*' });
  const options = new RequestOptions({ headers: headers });
  return options;
}

export function xhrHeadersWithToken() {
  let headers = new Headers({ 'Access-Control-Allow-Origin': '*' });
  headers.append('Authorization', 'Bearer ' + localStorage.getItem('access_token'));
  const options = new RequestOptions({ headers: headers });
  return options;
}

