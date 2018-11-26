
export class Profile{

    public modulePr:boolean;
    public consultaPr:boolean;
    public creacionPr:boolean;
    public modificacionCompletaPr:boolean;
    public modificacionRestringidaPr:boolean;

    constructor(
        public module:boolean,
        public consulta:boolean,
        public creacion:boolean,
        public modificacionCompleta:boolean,
        public modificacionRestringida:boolean
    ){
        this.modulePr = this.module;
        this.consultaPr = this.consulta;
        this.creacionPr = this.creacion;
        this.modificacionCompletaPr = this.modificacionCompleta;
        this.modificacionRestringidaPr = this.modificacionRestringida;
    }

    setModulePr(module:boolean){
        this.modulePr = module;
    }

    setConsultaPr(consulta:boolean){
        this.consultaPr = consulta;
    }

    setCreacionPr(creacion:boolean){
        this.creacionPr = creacion;
    }

    setModificacionCompletaPr(modificacionCompleta:boolean){
        this.modificacionCompletaPr = modificacionCompleta;
    }

    setModificacionRestringidaPr(modificacionRestringida:boolean){
        this.modificacionRestringidaPr = modificacionRestringida;
    }

}