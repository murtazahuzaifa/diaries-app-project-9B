import Swal, { SweetAlertIcon } from 'sweetalert2';
import request from './services/request';

export const showAlert = (
  titleText = 'Something happened.',
  alertType?: SweetAlertIcon
): void => {
  Swal.fire({
    titleText,
    position: 'top-end',
    timer: 3000,
    timerProgressBar: true,
    toast: true,
    showConfirmButton: false,
    showCancelButton: true,
    cancelButtonText: 'Dismiss',
    icon: alertType,
    showClass: {
      popup: 'swal2-noanimation',
      backdrop: 'swal2-noanimation',
    },
    hideClass: {
      popup: '',
      backdrop: '',
    },
  });
};

export const fetchDataFromServerAndLog = ()=>{
  request.post<any, any>('/auth/login', { userName:'superuser', password:'12345678' },)
      .then(data => { console.log(data.user);})
      .catch(error => console.log(error))

  request.get<any, any>(`/diaries/${1}`)
      .then(data => { console.log(data)})
      .catch(error => console.log(error))
  
      request.get<any, any>(`/diaries/entries/${1}`)
      .then(data => { console.log(data)})
      .catch(error => console.log(error))
} 

export type Merge<A, B> = {
  [K in keyof A]: K extends keyof B ? B[K] : A[K]
} & B

export function findObjectInArray<ArrayT, ObjectIdT>(objArray: ArrayT[], searchValue: ObjectIdT, searchField: string):number|undefined {
  let index: number|undefined;
  const object = objArray.find((obj:any) => obj[`${searchField}`] === searchValue);
  if (object){
      index = objArray.indexOf(object)
  }
  return index
}