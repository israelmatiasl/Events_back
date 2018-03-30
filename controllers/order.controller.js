'use strict';

//const Enterprise = require('../models/enterprise');
const OrderEnterprise = require('../models/order_enterprise');
const OrderUser = require('../models/order_user');
//const mongoosePagination = require('mongoose-pagination');


//=====================================================
// ORDER ENTERPRISE ===================================
//=====================================================
function newOrderEnterprise(req, res){

    const enterprise = req.enterprise;
    const enterpriseId = enterprise._id;
    const params = req.body;

    const order = OrderEnterprise({
        enterprise: enterpriseId,
        event: params.event,
        confirmation_date: null
    });

    order.save((err, orderStored)=>{
        if(err){
            return res.status(500).send({
                ok:false,
                message: 'An error occurred while trying to create the order',
                errors: err
            });
        }

        return res.status(201).send({
            ok:true,
            orderStored
        });
    })
}




//=====================================================
// ORDER USER =========================================
//=====================================================
function newOrderUser(req, res){

    const user = req.user;
    const userId = user._id;
    const params = req.body;

    const order = OrderUser({
        user: userId,
        confirmation_date: null
    });

    order.save((err, orderStored)=>{
        if(err){
            return res.status(500).send({
                ok:false,
                message: 'An error occurred while trying to create the order',
                errors: err
            });
        }

        return res.status(201).send({
            ok:true,
            orderStored
        });
    })
}


module.exports = {
    newOrderEnterprise,
    newOrderUser
};