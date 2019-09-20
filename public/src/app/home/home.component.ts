import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  products: any; 

  constructor(private _httpService : HttpService) { }

  ngOnInit(){
    this.getProducts();
  }
  
  getProducts() {
    this._httpService.getAllProducts().subscribe(data => {
      console.log(data);
      this.products = data['product']
  })  
  }

  deleteProduct(id){
    this._httpService.deleteOneProduct(id).subscribe(data => {
      console.log(data)
      this.getProducts();
    })
  }

}
