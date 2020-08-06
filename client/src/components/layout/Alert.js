import React from 'react'
import PropTypes from 'prop-types'
import {
    connect
} from 'react-redux'

const Alert = ({
    alerts
}) => alerts !== null && alerts.map(alert => ( <
    div key = {
        alert.id
    }
    className = {
        `alert alert-${alert.alertType}`
    } > {
        alert.msg
    }

    <
    /div>
));
Alert.propTypes = {
    alerts: PropTypes.array.isRequired
}
// This is getting all the actions from the reducer to display on the component 
const mapStateToProps = state => ({
    alerts: state.alert
})

export default connect(mapStateToProps)(Alert);