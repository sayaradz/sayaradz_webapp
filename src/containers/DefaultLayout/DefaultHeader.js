import React, { Component } from "react";
import {connect} from 'react-redux'
import {logoutUser} from '../../actions/authActions'
import { DropdownItem, DropdownMenu, DropdownToggle, Nav, Dropdown } from "reactstrap";

import {
  AppHeaderDropdown,
  AppNavbarBrand,
  AppSidebarToggler
} from "@coreui/react";
import logo from "../../assets/img/brand/logo.png";
import sygnet from "../../assets/img/brand/sygnet.png";


const mapStateToProps = state => ({})

class DefaultHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dropdownOpen: false
    };
  }

  toggle = () => {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }));
  }
  render() {
    // eslint-disable-next-line
    const { children, ...attributes } = this.props;

    return (
      <React.Fragment>
        <AppSidebarToggler className="d-lg-none" display="md" mobile />
        <AppNavbarBrand
          full={{ src: logo, width: 150, height: 65, alt: "CoreUI Logo" }}
          minimized={{ src: sygnet, width: 30, height: 30, alt: "CoreUI Logo" }}
        />
        <AppSidebarToggler className="d-md-down-none" display="lg" />

        <Nav className="ml-auto" navbar>
          <AppHeaderDropdown direction="down">
            <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>

            
            <DropdownToggle nav >
              <img
                src={"../../assets/img/avatars/9.jpg"}
                className="img-avatar"
                alt="admin@bootstrapmaster.com"
              />
            </DropdownToggle>
            <DropdownMenu right style={{ right: "auto" }}>
              <DropdownItem header tag="div" className="text-center">
                <strong>Paramètres</strong>
              </DropdownItem>
              <DropdownItem>
                <i className="fa fa-user" /> Profile
              </DropdownItem>
              <DropdownItem onClick={this.props.logoutUser}>
                <i className="fa fa-lock" /> Se déconnecter
              </DropdownItem>
            </DropdownMenu>
            </Dropdown>
          </AppHeaderDropdown>
        </Nav>
      </React.Fragment>
    );
  }
}

//DefaultHeader.propTypes = propTypes;
//DefaultHeader.defaultProps = defaultProps;

export default connect(mapStateToProps, {logoutUser})(DefaultHeader);
