import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router, Route } from '@angular/router';



@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class NewComponent implements OnInit {
  product:any;
  err:any;

  constructor(private _httpServce: HttpService, 
    private _route: ActivatedRoute,
    private _router: Router) { }

  ngOnInit() {
    this.product ={
      'title' : '', 
      'price' : '',
      'url' : ''
    }
    this.err = {
      'title' : '', 
      'price' : '',
      'url' : ''
  }
}


  createProduct(){
    this._httpServce.createNewProduct(this.product).subscribe( data => {
      console.log(data)
      if(data["message"] === "Error"){
        if(data['error']['errors']['title']){
          this.err['title'] = data['error']['errors']['title']['message'];
        }
        if(data['error']['errors']['price']){
          this.err['price'] = data['error']['errors']['price']['message'];
        }
        if(data['error']['errors']['url']){
          this.err['url'] = data['error']['errors']['url']['message'];
        }
      }else{
        this._router.navigate(['/home']); 

      }
      
    })
  }

}
