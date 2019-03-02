import React, { Component, Suspense } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { Container } from 'reactstrap'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { logoutUser } from '../../actions/authActions';
import PrivateRoute from '../../views/common/PrivateRoute';
import Fabricants from '../../views/Fabricants/Fabricants'

import {
  AppAside,
  AppBreadcrumb,
  AppFooter,
  AppHeader,
  AppSidebar,
  AppSidebarFooter,
  AppSidebarForm,
  AppSidebarHeader,
  AppSidebarMinimizer,
  AppSidebarNav
} from '@coreui/react'
// sidebar nav config
import navigation from '../../_nav'
// routes config
import routes from '../../routes'

const DefaultAside = React.lazy(() => import('./DefaultAside'))
const DefaultFooter = React.lazy(() => import('./DefaultFooter'))
const DefaultHeader = React.lazy(() => import('./DefaultHeader'))

class DefaultLayout extends Component {
  loading = () => (
    <div className="animated fadeIn pt-1 text-center">Loading...</div>
  )

  signOut(e) {
    e.preventDefault()
    this.props.logoutUser()
    this.props.history.push('/login')
  }

  render() {
    return (
      <div className="app">
        <AppHeader fixed>
          <Suspense fallback={this.loading()}>
            <DefaultHeader onLogout={e => this.signOut(e)} />
          </Suspense>
        </AppHeader>
        <div className="app-body">
          <AppSidebar fixed display="lg">
            <AppSidebarHeader />
            <AppSidebarForm />
            <Suspense>
              <AppSidebarNav navConfig={navigation} {...this.props} />
            </Suspense>
            <AppSidebarFooter />
            <AppSidebarMinimizer />
          </AppSidebar>
          <main className="main">
            <AppBreadcrumb appRoutes={routes} />
            <Container fluid>
              <Suspense fallback={this.loading()}>
                <Switch>
                  {routes.map((route, idx) => {
                    return route.component ? (
                      <PrivateRoute
                        key={idx}
                        component={route.component}
                        path={route.path}
                        exact={route.exact}
                        name={route.name}
                        render={props => <route.component {...props} />}
                      ></PrivateRoute>
                    ) : null
                  })}
                  <Redirect from="/" to="/login" />
                </Switch>
              </Suspense>
            </Container>
          </main>
          <AppAside fixed>
            <Suspense fallback={this.loading()}>
              <DefaultAside />
            </Suspense>
          </AppAside>
        </div>
        <AppFooter>
          <Suspense fallback={this.loading()}>
            <DefaultFooter />
          </Suspense>
        </AppFooter>
      </div>
    )
  }
}


DefaultLayout.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { logoutUser })(
  DefaultLayout
);
