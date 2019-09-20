import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router, Route } from '@angular/router';



@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.css']
})
export class ShowComponent implements OnInit {

  product:any;

  constructor(private _httpService : HttpService,
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
  }

  getProduct(id){
    this._httpService.showOneProduct(id).subscribe(data => {
      console.log(data)
      this.product = data['product']
    }) 
    }
  }

