const { rule, and, shield, or } = require('graphql-shield')
const { getUserId } = require('../utils')

const rules = {
  isAuthenticatedUser: rule()((parent, args, context) => {
    const userId = getUserId(context)
    return Boolean(userId)
  }),
  isAuthorAdmin: rule()(async (parent, args, context) => {
    const userId = getUserId(context)
    const user = await context.prisma.user({id: userId})
    if(!user) {
      throw new Error("not admin")
    }
    if(user.role === "ADMIN") {
      return Boolean(user)
    }
  }),
  isAuthorWriter: rule()(async (parent, args, context) => {
    const userId = getUserId(context)
    const user = await context.prisma.user({id: userId})
    if(!user) {
      throw new Error("not writer")
    }
    if(user.role === "WRITER") {
      return Boolean(user)
    }
  }),
  isAuthorUser: rule()(async (parent, args, context) => {
    const userId = getUserId(context)
    const user = await context.prisma.user({id: userId})
    if(!user) {
      throw new Error("not user")
    }
    if(user.role === "USER") {
      return Boolean(user)
    }
  }),
}

const permissions = shield({
  Query: {
    me: or(rules.isAuthorAdmin, rules.isAuthorUser, rules.isAuthorWriter),
  },
  Mutation: {
    createPlaylist: or(rules.isAuthorAdmin, rules.isAuthorWriter),
    deletePlaylist: or(rules.isAuthorAdmin, rules.isAuthorWriter),
    createAuthorMenu: or(rules.isAuthorAdmin, rules.isAuthorWriter),
    createAuthor: or(rules.isAuthorAdmin, rules.isAuthorWriter),
    createTrack: or(rules.isAuthorAdmin, rules.isAuthorWriter),
    deleteTrack: or(rules.isAuthorAdmin, rules.isAuthorWriter),
    updateTrack: or(rules.isAuthorAdmin, rules.isAuthorWriter),
    updatePlaylist: or(rules.isAuthorAdmin, rules.isAuthorWriter),
    updateImgAuthor: or(rules.isAuthorAdmin, rules.isAuthorWriter),
    updateAuthorContent: or(rules.isAuthorAdmin, rules.isAuthorWriter),
    updatePlaylistContent: or(rules.isAuthorAdmin, rules.isAuthorWriter),
    updateMenu: or(rules.isAuthorAdmin, rules.isAuthorWriter),
    updateImgAuthor: or(rules.isAuthorAdmin, rules.isAuthorWriter),
    updateAuthorContent: or(rules.isAuthorAdmin, rules.isAuthorWriter),
    updatePlaylistContent: or(rules.isAuthorAdmin, rules.isAuthorWriter),
    deleteAuthor: or(rules.isAuthorAdmin, rules.isAuthorWriter),
    // user
    // createFavoritesTracks: or(rules.isAuthorUser),
    // deleteFavoritesTracks: or(rules.isAuthorUser),
    // createFavoritesPlaylist: or(rules.isAuthorUser),
    // deleteFavoritesPlaylist: or(rules.isAuthorUser)
  },
})

module.exports = {
  permissions,
}