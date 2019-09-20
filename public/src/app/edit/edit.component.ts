import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router, Route } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  product:any;
  err:any; 
  
  constructor(private _httpService: HttpService,
    private _route: ActivatedRoute,
    private _router: Router) { }

  ngOnInit() {
    this._route.params.subscribe((params: Params) => {
      console.log(params['id'])
      this.getProduct(params['id']);
  });

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

  getProduct(id){
    this._httpService.showOneProduct(id).subscribe(data => {
      console.log(data)
      this.product = data['product']
    }) 
    }
  
  editProduct(){
    this._httpService.editOneProduct(this.product).subscribe( data => {
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
