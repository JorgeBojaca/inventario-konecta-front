import React from 'react';
import axios from 'axios';
import { Form, Button } from 'semantic-ui-react';
import { withRouter, Link } from "react-router-dom";

class ProductoForm extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            id: '',
            nombre_producto: '',
            referencia: '',
            precio: '',
            peso: '',
            categoria: '',
            stock : '',
            errors: {
                nombre_producto:false,
                referencia: false,
                precio: false,
                peso: false,
                categoria: false,
                stock : false,
            }
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleIntChange = this.handleIntChange.bind(this);
        this.error = this.error.bind(this);
    }
    componentDidMount(){
        console.log();
        let id = this.props.match.params.id;
        if(this.props.action === 'update'){
            axios.get(process.env.REACT_APP_API_URL+'api/producto/get',{
                params:{
                    id: id,
                }
            }).then(res=>{
                console.log(res);
                this.setState({
                    id: res.data.id,
                    nombre_producto: res.data.nombre_producto,
                    referencia: res.data.referencia,
                    precio: res.data.precio,
                    peso: res.data.peso,
                    categoria: res.data.categoria,
                    stock : res.data.stock
                });
            })
        }
    }
    handleChange(e) {  
        const {name, value} = e.target;
        let errors =  this.state.errors;
        errors[name] = false;
        this.setState({[name]: value, errors:errors});
    }
    handleIntChange(e) {  
        let {name, value} = e.target;
        let errors =  this.state.errors;
        value = Number(value);
        errors[name]=false;
        if(value >= 0){
            this.setState({[name]: value,
                errors});
        }
    }
    error(val){
        if(this.state.errors[val]){
            return { content: 'Por favor ingrese este campo', pointing: 'below' };
        }
    }
    render(){
        let title;
        if(this.props.action === 'create'){
            title = <h1>Crear Producto</h1>;
        }else{
        title = <h1>Actualizar Producto</h1>;
        }
        return ( <div>
            {title}
            <Form>
            <Form.Input required
                label="Nombre Producto"
                name='nombre_producto'
                error={this.error('nombre_producto')}
                value={this.state.nombre_producto}
                onChange={this.handleChange}>
            </Form.Input>
            <Form.Input required
                label="Referencia"
                name='referencia'
                error={this.error('referencia')}
                value={this.state.referencia}
                onChange={this.handleChange}>

            </Form.Input>
            <Form.Input required
                label="Precio"
                name='precio'
                error={this.error('precio')}
                value={this.state.precio}
                onChange={this.handleIntChange}>

            </Form.Input>
            <Form.Input required
                label="Peso"
                name='peso'
                error={this.error('peso')}
                value={this.state.peso}
                onChange={this.handleIntChange}>

            </Form.Input>
            <Form.Input required
                label="Categoria"
                name='categoria'
                error={this.error('categoria')}
                value={this.state.categoria}
                onChange={this.handleChange}>

            </Form.Input>
            <Form.Input required
                label="Stock"
                name='stock'
                error={this.error('stock')}
                value={this.state.stock}
                onChange={this.handleIntChange}>

            </Form.Input>
            <div>
                <Link to="/"><Button>Cancelar</Button></Link>
                <Button color="blue" onClick={this.handleSubmit}>Guardar</Button>
            </div>
            
        </Form></div>);
    }
    handleSubmit(event){
        event.preventDefault();
        let errors = {
            nombre_producto:false,
            referencia: false,
            precio: false,
            peso: false,
            categoria: false,
            stock : false
        };
        let hasErrors = false;
        if(this.state.nombre_producto === ''){
            errors.nombre_producto = true;
            hasErrors = true;
        }
        if(this.state.referencia === ''){
            errors.referencia = true;
            hasErrors = true;
        }
        if(this.state.peso === ''){
            errors.peso = true;
            hasErrors = true;
        }
        if(this.state.categoria === '' ){
            errors.categoria= true;
            hasErrors = true;
        }
        if(this.state.stock === ''){
            errors.stock = true;
            hasErrors = true;
        }
        if(this.state.precio === ''){
            errors.precio = true;
            hasErrors = true;
        }

        this.setState({
            errors: errors
        });

        if(!hasErrors){
            let end_point, method;
            let data = {
                nombre_producto: this.state.nombre_producto,
                referencia: this.state.referencia,
                precio: this.state.precio,
                peso: this.state.peso,
                categoria: this.state.categoria,
                stock : this.state.stock
            }

            if(this.props.action === 'create'){
                end_point ='api/producto/create';
                method= 'post';
            } else{
                end_point = 'api/producto/update';
                data.id = this.state.id;
                method= 'put';
            }
            console.log(data);
            axios[method](process.env.REACT_APP_API_URL+end_point,data).then(res=>{
                if(this.props.action === 'create'){
                    console.log("Agregados correctamente");
                    this.props.history.push('/');
                }else{
                    console.log("Actualizado correctamente");
                    this.props.history.push('/');
                }
                this.setState({
                    nombre_producto: '',
                    referencia: '',
                    precio: '',
                    peso: '',
                    categoria: '',
                    stock : '',
                });
            }).catch(err=>{
                console.log(err.response.data);
            })
        }
        
    }
}

export default withRouter(ProductoForm);