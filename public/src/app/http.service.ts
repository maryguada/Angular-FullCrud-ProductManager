import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private _http: HttpClient) { }

  getAllProducts(){
    return this._http.get('/products')
  }

  createNewProduct(product){
    return this._http.post("/product/new", product)

  }
  
  deleteOneProduct(id){
    return this._http.delete(`/products/${id}`)
  }

  showOneProduct(id){
    return this._http.get(`/product/${id}`)
  }

  editOneProduct(product){
    return this._http.put(`/products/${product._id}`, product)
  }
}
 