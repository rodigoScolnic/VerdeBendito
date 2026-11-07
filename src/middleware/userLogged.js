export default function userLoggedMiddleware(req, res, next) {
  res.locals.user = req.session.user || null;
  res.locals.cartCount = Object.values(req.session.cart || {}).reduce((sum, qty) => sum + Number(qty || 0), 0);
  res.locals.notice = req.session.notice || null;
  delete req.session.notice;
  next();
}