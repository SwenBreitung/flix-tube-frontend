export class User {
    username: string;
    password: string;
    password2: string;
    type: string;
    email: string;
    uid: string;
    img: string | File;
    privateMassages: string[];
    id:string;
  
    constructor(obj?: any) {
        this.username = obj?.username ?? '';
        this.password = obj?.password ?? '';
        this.password2 = obj?.password2 ?? '';
        this.email = obj?.email ?? '';
        this.type = obj?.type ?? 'user';
        this.uid = obj?.uid ?? '';
        this.img = obj?.img ?? '';
        this.privateMassages = obj?.privateMassages ?? [];
        this.id = obj?.id ?? '';
    }
  
    public toJson() {
      return {
        username: this.username,
        password: this.password,
        password2: this.password2,
        email: this.email,
        uid: this.uid,
        img: this.img,
        privateMassages: this.privateMassages,
        id: this.id
      };
    }
  }