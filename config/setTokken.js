const crypto = require('crypto')

export function setToken(secretKey)  {
    const token = crypto.createHmac('sha256', secretKey)
        .update('vk_user_id=1')
        .digest()
        .toString('base64')
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=$/, '')

    return token
}
