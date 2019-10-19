import { Injectable } from "@angular/core";
import { Http,Headers, RequestMethod, RequestOptions} from "@angular/http";
//import 'rxjs/add/operator/map';
import { map } from 'rxjs/operators';

@Injectable()
export class ShareService{
    url:string="https://scaniabackend.azurewebsites.net/api/student/1032";
    constructor (private http: Http){

    }

    getAll(){
        return this.http.get(this.url)
        .pipe(map(res => res.json()));
        }
    
    Create(name)
    {
        var body={"name":name};
        var header=new Headers({'Content-Type':'application/json'});
        var option=new RequestOptions({method:RequestMethod.Post,headers:header});
        return this.http.post(this.url,body,option).pipe(map(res => res.json()));
    
    } 

    Update(id,name)
    {
        var body={"id":id,"name":name};
        var header=new Headers({'Content-Type':'application/json'});
        var option=new RequestOptions({method:RequestMethod.Post,headers:header});
        return this.http.post(this.url,body,option).pipe(map(res => res.json()));
    }

    Read(id){
        return this.http.get(this.url+id).pipe(map(res => res.json()));
    }

    Delete(id){
        return this.http.delete(this.url+id).pipe(map(res => res.json()));
    }
}


//.map(res=> res.json());