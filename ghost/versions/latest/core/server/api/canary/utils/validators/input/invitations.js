const Promise = require('bluebird');
const validator = require('validator');
const debug = require('ghost-ignition').debug('api:canary:utils:validators:input:invitation');
const common = require('../../../../../lib/common');

module.exports = {
    acceptInvitation(apiConfig, frame) {
        debug('acceptInvitation');

        const data = frame.data.invitation[0];
	
	/* LLIUREX 21/04/2020 Changes to enable user's creation from ghost    
        if (!data.token) {
            return Promise.reject(new common.errors.ValidationError({message: common.i18n.t('errors.api.authentication.noTokenProvided')}));
        }
        LLIUREX 21/04/2020 */
	    
        if (!data.email) {
            return Promise.reject(new common.errors.ValidationError({message: common.i18n.t('errors.api.authentication.noEmailProvided')}));
        }

        if (!data.password) {
            return Promise.reject(new common.errors.ValidationError({message: common.i18n.t('errors.api.authentication.noPasswordProvided')}));
        }

        if (!data.name) {
            return Promise.reject(new common.errors.ValidationError({message: common.i18n.t('errors.api.authentication.noNameProvided')}));
        }
    },

    isInvitation(apiConfig, frame) {
        debug('isInvitation');

        const email = frame.data.email;

        if (typeof email !== 'string' || !validator.isEmail(email)) {
            throw new common.errors.BadRequestError({
                message: common.i18n.t('errors.api.authentication.invalidEmailReceived')
            });
        }
    }
};
