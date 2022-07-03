import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { SearchGifsResponse, Gif } from '../interfaces/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {


  private _historial:string[]=[];
  private _apiKey:string = 'HgfHlsqs7jm8kpwg4rZuEOt7sUYtLzzA';
  public resultados:Gif[] = [];
  private _servicioURL:string = 'http://api.giphy.com/v1/gifs';

  

  get historial(){
      return [...this._historial]; // Para romper referencia y regresar un nuevo arreglo
  }

  constructor(private http:HttpClient){
      this._historial = JSON.parse(localStorage.getItem('historial')!) || [];
      this.resultados = JSON.parse(localStorage.getItem('resultados')!) || [];

  }

  buscarGifs(query:string = ''){
    query = query.trim().toLocaleLowerCase(); // Para que transforme a minuscula
    if(!this._historial.includes(query)){
      this._historial.unshift(query); //Para insertar al inicio el UNSHIFTS
      this._historial = this._historial.splice(0,10); // Splice, para cortar hasta el decimo elemento
      localStorage.setItem('historial',JSON.stringify(this._historial));
    }

    
    const params = new HttpParams()
    .set('api_key',this._apiKey)
    .set('limit','10')
    .set('q',query);

    this.http.get<SearchGifsResponse>(`${this._servicioURL}/search`,{params}) //Como el GET es generico aqui se coloca el tipo de la interfaz
    .subscribe((res)=>{
      this.resultados = res.data;
      localStorage.setItem('resultados',JSON.stringify(this.resultados));
    })

   
  }

}
