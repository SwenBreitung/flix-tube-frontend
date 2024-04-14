export class User {
    name: string;
    password: string;
    type: string;
    email: string;
    uid: string;
    img: string | File;
    privateMassages: string[];
    id:string;
  
    constructor(obj?: any) {
        this.name = obj?.name ?? '';
        this.password = obj?.password ?? '';
        this.email = obj?.email ?? '';
        this.type = obj?.type ?? 'user';
        this.uid = obj?.uid ?? '';
        this.img = obj?.img ?? '';
        this.privateMassages = obj?.privateMassages ?? [];
        this.id = obj?.id ?? '';
    }
  
    public toJson() {
      return {
        name: this.name,
        password: this.password,
        email: this.email,
        uid: this.uid,
        img: this.img,
        privateMassages: this.privateMassages,
        id: this.id
      };
    }
  }