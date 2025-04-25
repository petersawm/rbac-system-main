// roles.js
const roles = {
    ADMIN: 'Admin',
    USER: 'User',
    GUEST: 'Guest'
  };
  
  const permissions = {
    [roles.ADMIN]: ['public', 'user', 'admin'],
    [roles.USER]: ['public', 'user'],
    [roles.GUEST]: ['public']
  };
  
  module.exports = { roles, permissions };
  