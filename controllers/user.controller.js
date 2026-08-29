const { User } = require('../database/models/models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const getUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({ error: "Erro interno no servidor." });
  }
};

const signupUser = async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ error: "Todos os campos (name, email, password) são obrigatórios." });
    }

    try {
    const userExists = await User.findOne({ where: { email: email } });
    
    if (userExists) {
      return res.status(409).json({ error: "Este e-mail já está cadastrado." }); // 409 = Conflito
    }

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    const newUser = await User.create({
      name: name,
      email: email,
      password: passwordHash,
    });

    // Dados que você quer guardar dentro do token (Payload)
    const payload = {
      id: newUser.id,
      email: newUser.email
    };

    // Chave secreta guardada nas variáveis de ambiente (nunca hardcoded!)
    const secret = process.env.JWT_SECRET;

    // Opções do token (como o tempo de expiração)
    const options = {
      expiresIn: '1h' // Expira em 1 hora (ex: '7d', '15m', '2h')
    };

    // Gerando o token
    const token = jwt.sign(payload, secret, options);

    res.status(201).json({
      message: "Usuário criado com sucesso!",
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        created_at: newUser.created_at
      },
      token: token
    });

    } catch (error) {
    console.error("Erro no processo de cadastro de usuário:", error);

    res.status(500).json({
        error: "Erro interno no servidor ao tentar criar a conta.",
        details: error.message || error
    });
    }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "E-mail e senha são obrigatórios." });
  }

  try {
    const user = await User.findOne({ where: { email: email } });

    if (!user) {
      return res.status(401).json({ error: "E-mail ou senha inválidos." }); 
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: "E-mail ou senha inválidos." });
    }

    const payload = {
      id: user.id,
      email: user.email
    };

    const secret = process.env.JWT_SECRET;

    const options = {
      expiresIn: '1h'
    };

    const token = jwt.sign(payload, secret, options);

    res.status(200).json({
      message: "Login realizado com sucesso!",
      token: token,
      user: {
        user_id: user.id,
        name: user.name,
        email: user.email,
        created_at: user.created_at
      }
    });

  } catch (error) {
    console.error("Erro durante o processo de login:", error);
    res.status(500).json({
      error: "Erro interno no servidor ao tentar fazer login.",
      details: error.message || error
    });
  }
};

module.exports = {
  getUsers,
  signupUser,
  loginUser,
};
