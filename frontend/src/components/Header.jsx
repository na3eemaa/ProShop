import { useNavigate } from 'react-router-dom';
import { Badge, Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { FaShoppingCart, FaUser } from 'react-icons/fa';
import logo from '../assets/logo.png';
import {useSelector,useDispatch} from 'react-redux'
import { NavLink } from 'react-router-dom';
import { useLogoutMutation } from '../slices/usersApiSlice';
import {logout} from '../slices/authSlice';
import { Link } from 'react-router-dom';
import SearchBox from './SearchBox';

const Header = () => {
  const { cartItems }= useSelector((state) => state.cart);
  const { userInfo }= useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logoutApiCall] =useLogoutMutation();

 
  const logoutHandler =async() => {
    try{
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate('/login');
    }catch(err){
      console.error(err);
    }
  };
  console.log(cartItems);
  return (
    <header>
      <Navbar bg='dark' variant='dark' expand="md" collapseOnSelect>
        <Container>
            <Navbar.Brand as={NavLink}>
              <img src={logo} alt='ProShop' />
              ProShop
            </Navbar.Brand>
          
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className='ms-auto'>
              <SearchBox/>
                <Nav.Link as={NavLink} to='/cart'>  
                  <FaShoppingCart /> Cart
                  {
                    cartItems.length >0 && (
                      <Badge pill bg='success' style ={{marginLeft: '5px'}}>
                      {cartItems.reduce((a,c) => a+c.qty, 0)}
                      </Badge>
                    )
                  }
                </Nav.Link>
              {userInfo? (<NavDropdown title={userInfo.name} id='username'>
                <NavDropdown.Item as ={NavLink} to='/profile'>
                Profile
                </NavDropdown.Item>
                <NavDropdown.Item onClick={logoutHandler}>
                Logout
                </NavDropdown.Item>
              </NavDropdown> 
              ): (   <Nav.Link as={NavLink} to='/login'>
                  <FaUser /> Sign In
                </Nav.Link>)}
       {userInfo && userInfo.isAdmin && (
  <NavDropdown title='Admin' id='adminmenu'>
    <NavDropdown.Item as={Link} to='/admin/productlist'>
      Products
    </NavDropdown.Item>
    <NavDropdown.Item as={Link} to='/admin/userlist'>
      Users
    </NavDropdown.Item>
    <NavDropdown.Item as={Link} to='/admin/orderlist'>
      Orders
    </NavDropdown.Item>
  </NavDropdown>
)}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
