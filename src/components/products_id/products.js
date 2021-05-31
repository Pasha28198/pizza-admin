import React, {useState, useEffect} from "react";
import {useLocation, useParams} from "react-router-dom";

import {Accordion} from "react-bootstrap";
import axios from "../../request/request";
import rawAxios from "axios";
import Modal from "react-responsive-modal";
import UpdateIcon from "../../assets/images/update.png";
import Notification from "../common/notification/notification";

import {
    Row,
    Col,
    Card,
    CardHeader, Input, FormGroup,
} from "reactstrap";

const Dashboard = () => {
    const params = useParams();
    console.log(params)
    const [productInfo, setProductInfo] = useState([]);
    const [ingredients, setIngredients] = useState([]);

    useEffect(() => {
        getProductsId()
        getIngredients()
        getCategory()
    }, [])

    const getProductsId = () => {
        return axios({
            method: "get",
            url: `/products/${params.id}`,
        })
            .then((response) => {
                console.log(response)
                setProductInfo(response && response.data);
                setTitle(response.data.title)
                setDescription(response.data.description)
                setCategoryId(response.data.categoryId)
            })
            .catch((error) => {
                setMessage("Oops! Can not connect to the database. Try again.");
            });
    };

    const getIngredients = () => {
        return axios({
            method: "get",
            url: `/products/ingredients`,
        })
            .then((response) => {
                console.log(response)
                setIngredients(response && response.data);

            })
            .catch((error) => {
                setMessage("Oops! Can not connect to the database. Try again.");
            });
    };

    const addIngredient = (status) => {
        axios({
            method: "post",
            url: `/products/ingredients/add`,
            data: {
                productId: params.id,
                ingredientId: ingredientId
            },
        })
            .then((response) => {
                getProductsId()
            })
            .catch((error) => {

                setMessage("Oops! Error occured. Try again.");
            });


    };

    const deleteIngredient = ({ingredientId}) => {
        axios({
            method: "delete",
            url: `/products/ingredients/delete`,
            data: {
                productId: params.id,
                ingredientId: ingredientId
            },
        })
            .then(() => {
                getProductsId()
            })
            .catch((error) => {
            });
    };

    const [message, setMessage] = useState(null);

    const [openAddIngredients, setOpenAddIngredients] = useState(false);
    const [ingredientId, setIngredientId] = useState('');




    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const patchProduct = (status) => {

        setMessage("Updating order status ...");

        axios({
            method: "patch",
            url: `/products/${params.id}`,
            data:   {

                title: title,
                description: description,
                categoryId: categoryId
            },
        })
            .then((response) => {
                console.log(response);
                setMessage("Coupon created successfully");
                getProductsId()
            })
            .catch((error) => {
                console.log(error);
                setMessage("Oops! Error occured. Try again.");
            });

        setTimeout(() => {
            setMessage(null);
        }, 3000);
    };

    const [openEditProduct, setOpenEditProducts] = useState(false);
    const [categories, setCategories] = useState([]);
    const [categoryId, setCategoryId] = useState('');
    const getCategory = () => {
        return axios({
            method: "get",
            url: "/products/categories",
        })
            .then((response) => {
                console.log(response)
                setCategories(response && response.data);

            })
            .catch((error) => {
                setMessage("Oops! Can not connect to the database. Try again.");
            });
    };



    const [openCreateChoise, setOpenCreateChoise] = useState(false);
    const [mass, setMass] = useState("");
    const [type, setType] = useState("");
    const [price, setPrice] = useState("");

    const createChoise = (status) => {

        setMessage("Updating order status ...");

        axios({
            method: "post",
            url: `/products/choise`,
            data:   {
                product: params.id,
                mass: mass,
                type: type,
                price: price
            },
        })
            .then((response) => {
                console.log(response);
                setMessage("Coupon created successfully");
                setOpenCreateChoise(true)
                getProductsId()
            })
            .catch((error) => {
                console.log(error);
                setMessage("Oops! Error occured. Try again.");
            });

        setTimeout(() => {
            setMessage(null);
        }, 3000);
    };
    return (
        <div className="mt-3">
            <Row>
                <Col sm="12">
                    <Accordion>
                        <Card>
                            <CardHeader>
                                <div
                                    style={{
                                        justifyContent: "space-between",
                                        display: "flex",
                                    }}
                                >
                                    <div>
                                        <h5>{productInfo.title}</h5>

                                        <h5>{productInfo.description} </h5>
                                    </div>
                                    <button
                                        className="btn btn-success m-r-10"
                                        type="button"
                                        onClick={() => setOpenEditProducts(true)}

                                    >
                                        Edit
                                    </button>
                                </div>
                            </CardHeader>

                        </Card>
                        <Card>
                            <CardHeader>
                                <div
                                    style={{
                                        justifyContent: "space-between",
                                        display: "flex",
                                    }}
                                >
                                    <h5>Ingredients</h5>
                                    <button
                                        className="btn btn-success m-r-10"
                                        type="button"
                                        onClick={() => setOpenAddIngredients(true)}

                                    >
                                        Add
                                    </button>
                                </div>
                            </CardHeader>
                            {productInfo.ingredients && productInfo.ingredients.map((item) => {
                                return <div key={item.name} style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    padding: 10
                                }}>
                                    <div>{item.name}</div>
                                    <button
                                        className="btn btn-danger"
                                        type="button"
                                        onClick={() => {
                                            deleteIngredient({ingredientId: item._id})
                                        }}
                                    >
                                        Delete
                                    </button>
                                </div>
                            })}

                        </Card>
                        <Card>
                            <CardHeader>
                                <div
                                    style={{
                                        justifyContent: "space-between",
                                        display: "flex",
                                    }}
                                >
                                    <h5>Choise</h5>
                                    <button
                                        className="btn btn-success m-r-10"
                                        type="button"
                                        onClick={()=>setOpenCreateChoise(true)}

                                    >
                                        Add
                                    </button>
                                </div>
                            </CardHeader>
                            {productInfo.choise && productInfo.choise.map((item) => {
                                return <div key={item.name} style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    padding: 10
                                }}>
                                    <div>{item.type}</div>
                                    <div>{item.mass}</div>
                                    <div>{item.price}</div>
                                    <button
                                        className="btn btn-danger"
                                        type="button"
                                        onClick={() => {
                                            deleteIngredient({ingredientId: item._id})
                                        }}
                                    >
                                        Delete
                                    </button>
                                </div>
                            })}

                        </Card>
                    </Accordion>


                </Col>

                <Modal open={openAddIngredients} onClose={() => setOpenAddIngredients(false)}>
                    <div className="modal-body text-center">
                        <div className="product-modal">
                            <h4 className="mt-3">Add ingredient</h4>
                            <FormGroup style={{marginTop: 10}}>

                                <Input
                                    onChange={(e) => {
                                        console.log(e.target.value)
                                        setIngredientId(e.target.value);
                                    }}
                                    value={ingredientId}
                                    type="select"
                                    name="select"
                                    id="exampleSelect"
                                >
                                    <option value={''} disabled>Select</option>
                                    {ingredients.map((item) => {
                                        return <option value={item._id}>{item.name}</option>
                                    })}
                                </Input>
                            </FormGroup>


                            <div className="addcart-btn mt-4">
                                <button
                                    className="btn btn-success m-r-10"
                                    type="button"
                                    onClick={() => addIngredient()}
                                >
                                    Add
                                </button>
                                <button
                                    className="btn btn-danger"
                                    type="button"
                                    onClick={() => setOpenAddIngredients(false)}
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </Modal>


                <Modal open={openEditProduct} onClose={() => setOpenEditProducts(false)}>
                    <div className="modal-body text-center">
                        <div className="product-modal">
                            <h4 className="mt-3">Edit product</h4>
                            <FormGroup style={{marginTop: 10}}>
                                <Input
                                    placeholder="Name"
                                    value={title}
                                    onChange={(e) => {
                                        setTitle(e.target.value);
                                    }}
                                />
                                <Input
                                    style={{marginTop: 10}}
                                    placeholder="Description"
                                    value={description}
                                    onChange={(e) => {
                                        setDescription(e.target.value);
                                    }}
                                />
                                <FormGroup style={{ marginTop: 10 }}>
                                    <Input
                                        onChange={(e) => {
                                            setCategoryId(e.target.value);
                                        }}
                                        value={categoryId}
                                        type="select"
                                        name="select"
                                        id="exampleSelect"
                                    >
                                        {categories.map((item)=>{
                                            return  <option value={item._id}>{item.name}</option>
                                        })}
                                    </Input>
                                </FormGroup>

                            </FormGroup>


                            <div className="addcart-btn mt-4">
                                <button
                                    className="btn btn-success m-r-10"
                                    type="button"
                                    onClick={() => patchProduct()}
                                >
                                    Edit
                                </button>
                                <button
                                    className="btn btn-danger"
                                    type="button"
                                    onClick={() => setOpenEditProducts(false)}
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </Modal>




                <Modal open={openCreateChoise} onClose={()=>setOpenCreateChoise(false)}>
                    <div className="modal-body text-center">
                        <div className="product-modal">
                            <h4 className="mt-3">Create choise</h4>
                            <Input
                                placeholder="Mass"
                                value={mass}
                                onChange={(e) => {
                                    setMass(e.target.value);
                                }}
                            />
                            <Input
                                style={{marginTop: 10}}
                                placeholder="Type"
                                value={type}
                                onChange={(e) => {
                                    setType(e.target.value);
                                }}
                            />
                            <Input
                                style={{marginTop: 10}}
                                placeholder="Price"
                                value={price}
                                onChange={(e) => {
                                    setPrice(e.target.value);
                                }}
                            />

                            <div className="addcart-btn mt-4">
                                <button
                                    className="btn btn-success m-r-10"
                                    type="button"
                                    onClick={() => createChoise()}
                                >
                                    Create
                                </button>
                                <button
                                    className="btn btn-danger"
                                    type="button"
                                    onClick={() => setOpenCreateChoise(false)}
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </Modal>

                <Notification message={message} visibility={message}/>
            </Row>
        </div>
    );
};

export default Dashboard;
