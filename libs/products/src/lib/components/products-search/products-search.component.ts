import { ProductsService } from '../../services/products.service';
import { Component, OnInit ,ElementRef, HostListener } from '@angular/core';

@Component({
  selector: 'products-search',
  templateUrl: './products-search.component.html',
  styles: [
  ]
})
export class ProductsSearchComponent implements OnInit {

  list ;
  searchText = '';
  filter= false;
  constructor(private productsService:ProductsService ,private elem: ElementRef) { }
  @HostListener('document:click', ['$event'])
  DocumentClick(event: Event) {
    if (!this.elem.nativeElement.contains(event.target)){
     
      this.filter = false
      this.searchText = ''
    }
  }
  ngOnInit(): void {
    this.productsService.getProducts().subscribe((product)=>{
      this.list = product
    })
  }
  showFIlter(){
    if(this.searchText != ''){
      this.filter = true
    }
    else{
      this.filter = false
      this.searchText = ''
    }
  }
  closeFilter(){
    this.filter = false
    this.searchText = ''
  } 
}
