import bcrypt from "bcrypt";
import User from "../data/models/User.js";

const userController = {
  register: async (req, res, next) => {
    const username = String(req.body.username || "").trim();
    const email = String(req.body.email || "").trim().toLowerCase();
    const password = String(req.body.password || "");
    const confirmPassword = String(req.body.confirmPassword || "");
    const renderError = (error, status = 400) => res.status(status).render("register", {
      error, oldData: { username, email }
    });

    if (username.length < 2 || username.length > 40) return renderError("El nombre debe tener entre 2 y 40 caracteres.");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return renderError("Ingresá un correo electrónico válido.");
    if (password.length < 8) return renderError("La contraseña debe tener al menos 8 caracteres.");
    if (password !== confirmPassword) return renderError("Las contraseñas no coinciden.");

    try {
      if (await User.findOne({ where: { email } })) return renderError("Ya existe una cuenta con ese correo.", 409);
      const user = await User.create({ username, email, password: await bcrypt.hash(password, 12) });
      req.session.regenerate((error) => {
        if (error) return next(error);
        req.session.user = { id: user.id, email: user.email, username: user.username, role: user.role };
        req.session.notice = "¡Tu cuenta fue creada! Ya podés empezar a explorar.";
        req.session.save((saveError) => saveError ? next(saveError) : res.redirect("/"));
      });
    } catch (error) { next(error); }
  },
  login: async (req, res, next) => {
    const email = String(req.body.email || "").trim().toLowerCase();
    const password = String(req.body.password || "");
    try {
      const user = await User.findOne({ where: { email } });
      const valid = user && await bcrypt.compare(password, user.password);
      if (!valid) return res.status(401).render("login", {
        error: "El correo o la contraseña son incorrectos.", oldData: { email }
      });
      req.session.regenerate((error) => {
        if (error) return next(error);
        req.session.user = { id: user.id, email: user.email, username: user.username, role: user.role };
        req.session.notice = `¡Hola, ${user.username}! Qué bueno verte de nuevo.`;
        req.session.save((saveError) => saveError ? next(saveError) : res.redirect("/"));
      });
    } catch (error) { next(error); }
  },
  logout: (req, res, next) => req.session.destroy((error) => {
    if (error) return next(error);
    res.clearCookie("verde.sid");
    res.redirect("/");
  })
};
export default userController;