import React from 'react';
import axios from 'axios';
import {Table, Button, Icon} from 'semantic-ui-react';
import { Link } from "react-router-dom";

class ProductosIndex extends React.Component {
constructor(props){
    super(props);
    this.state = {
        productos:[]
    }
    // const {history} = this.props;

    this.handleEdit = this.handleEdit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleSale = this.handleSale.bind(this);
}
componentDidMount(){
    
    axios.get(process.env.REACT_APP_API_URL+'api/producto/getAll').then(res=>{
        console.log(res);
        this.setState({productos: res.data});
    })
}
handleEdit(val){
    this.props.history.push("/edit");
}
handleDelete(val, idx){
    axios.delete(process.env.REACT_APP_API_URL+'api/producto/delete',{
        params:{id: val}
    }).then(res=>{
        let productos = this.state.productos;
        productos.splice(idx, 1);
        this.setState({
            productos
        })

    });
}
handleSale(val,idx){
    let productos = this.state.productos;

    if(productos[idx].stock > 0){
        productos[idx].stock -= 1; 
        
        axios.post(process.env.REACT_APP_API_URL+'api/producto/sale',
            {id: val}
        ).then(res=>{
            productos[idx].fecha_ultima_venta = res.data;
            this.setState({
                productos
            });
    
        }).catch(err=>{console.log(err.response.data)});
    }
}

render(){
    let elements = [];
    let elementTable;
    if(this.state.productos.length > 0){

        for(let i=0; i<this.state.productos.length; i++){
            let producto = this.state.productos[i];
            elements.push(
                <Table.Row key={producto.id}>
                    <Table.Cell>{producto.nombre_producto}</Table.Cell>
                    <Table.Cell>{producto.referencia}</Table.Cell>
                    <Table.Cell>{producto.precio}</Table.Cell>
                    <Table.Cell>{producto.peso}</Table.Cell>
                    <Table.Cell>{producto.categoria}</Table.Cell>
                    <Table.Cell>{producto.stock}</Table.Cell>
                    <Table.Cell>{producto.fecha_creacion}</Table.Cell>
                    <Table.Cell>{producto.fecha_ultima_venta}</Table.Cell>
                    <Table.Cell  textAlign='center'><Button disabled={producto.stock === 0} size="mini" color="green" onClick={()=>this.handleSale(producto.id,i)}>Vender</Button></Table.Cell>
                    <Table.Cell textAlign='center'>
                            <Link to={{pathname:'/edit/'+producto.id}}><Button title="Editar" size="mini" icon color="blue">
                                    <Icon name="edit">
                                    </Icon>
                                </Button>
                            </Link> 
                            <Button title="Eliminar" size="mini" icon color="red" onClick={()=>this.handleDelete(producto.id,i)}>
                                <Icon name="delete"></Icon>
                            </Button> 
                    </Table.Cell>
                </Table.Row>);
        }
        elementTable = (
            <Table compact celled>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Nombre</Table.HeaderCell>
                        <Table.HeaderCell>Referencia</Table.HeaderCell>
                        <Table.HeaderCell>Precio</Table.HeaderCell>
                        <Table.HeaderCell>Peso</Table.HeaderCell>
                        <Table.HeaderCell>Categoria</Table.HeaderCell>
                        <Table.HeaderCell>Stock</Table.HeaderCell>
                        <Table.HeaderCell>Fecha Creación</Table.HeaderCell>
                        <Table.HeaderCell>Última Venta</Table.HeaderCell>
                        <Table.HeaderCell></Table.HeaderCell>
                        <Table.HeaderCell></Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {elements}
                </Table.Body>
        </Table>)
    }else{
        elementTable = <h3>No hay productos registrados.</h3>
    }
    return (<div>
        <h1>Inventario de Productos</h1>
        <Link to="/create">Agregar Producto</Link>
        {elementTable}

    </div>)
    }

}

export default ProductosIndex;