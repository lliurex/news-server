const common = require('../../lib/common');
const models = require('../../models');
const security = require('../../lib/security');

async function accept(invitation) {
    const data = invitation.invitation[0];
    /* LLLIUREX 21/04/2020 Changes to enable user's creation from ghost	
    const inviteToken = security.url.decodeBase64(data.token);
    LLIUREX 21/04/2020 */	
    const options = {context: {internal: true}};

    /* LLLIUREX 21/04/2020 Changes to enable user's creation from ghost 	
    let invite = await models.Invite.findOne({token: inviteToken, status: 'sent'}, options);
    */
   let invite = await models.Invite.findOne({email: data.email, status: 'pending'}, options);
   /* 
   if (!invite) {
        throw new common.errors.NotFoundError({message: common.i18n.t('errors.api.invites.inviteNotFound')});
    }

    if (invite.get('expires') < Date.now()) {
        throw new common.errors.NotFoundError({message: common.i18n.t('errors.api.invites.inviteExpired')});
    }
    /* LLIUREX 21/04/2020 */

    await models.User.add({
        email: data.email,
        name: data.name,
        password: data.password,
        roles: [invite.toJSON().role_id]
    }, options);

    return invite.destroy(options);
}

module.exports = accept;
