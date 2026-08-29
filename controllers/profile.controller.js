const { Profile, User } = require('../database/models/models');

const getProfiles = async (req, res) => {
    try {
        const profiles = await Profile.findAll();
        return res.status(200).json(profiles);
        } catch (error) {
        return res.status(500).json({ error: "Erro interno no servidor." });
        }
};

const addProfile = async (req, res) => {
  const { userId, bio, avatarUrl, birthDate, phone, location, website } = req.body;

  try {
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(409).json({ error: "Usuário não cadastrado." });
    }

    const newProfile = await user.createProfile({
      bio: bio,
      avatarUrl: avatarUrl,
      birthDate: birthDate,
      phone: phone,
      location: location,
      website: website
    });

    res.status(201).json({
        message: "Perfil do usuário criado com sucesso!",
        profile: {
            id: newProfile.id,
            userId: newProfile.userId,
            email: newProfile.email,
            bio: newProfile.bio,
            avatarUrl: newProfile.avatarUrl,
            birthDate: newProfile.birthDate,
            phone: newProfile.phone,
            location: newProfile.location,
            website: newProfile.website,
            created_at: newProfile.created_at
        }
    });

  } catch (error) {
    console.error("Erro no processo de cadastro de usuário:", error);
    
    res.status(500).json({
      error: "Erro interno no servidor ao tentar criar a conta.",
      details: error.message || error
    });
  }
};

const updateProfile = async (req, res) => {
  const { userId, bio, avatarUrl, birthDate, phone, location, website } = req.body;

  try {
    const user = await User.findByPk(userId,
      {include: [Profile]}
    );

    if (!user) {
      return res.status(409).json({ error: "Usuário não cadastrado." });
    }

    const updatedProfile = await user.Profile.update({
      bio: bio,
      avatarUrl: avatarUrl,
      birthDate: birthDate,
      phone: phone,
      location: location,
      website: website
    });

    res.status(201).json({
      message: "Perfil do usuário atualizado com sucesso!",
      profile: {
        id: updatedProfile.id,
        userId: updatedProfile.userId,
        bio: updatedProfile.bio,
        avatarUrl: updatedProfile.avatarUrl,
        birthDate: updatedProfile.birthDate,
        phone: updatedProfile.phone,
        location: updatedProfile.location,
        website: updatedProfile.website,
        created_at: updatedProfile.created_at
      }
    });

  } catch (error) {
    console.error("Erro no processo de atualização do perfil de usuário:", error);
    
    res.status(500).json({
      error: "Erro interno no servidor ao tentar atualizar o perfil de usuário.",
      details: error.message || error
    });
  }
};

const deleteProfile = async (req, res) => {
  const { userId } = req.params;
  try {
    const profile = await Profile.findOne({ where: { userId: userId } });

    if (!profile) {
      return res.status(404).json({ error: 'Perfil não encontrado.' });
    }

    await profile.destroy();
    return res.status(200).json({ message: 'Perfil deletado com sucesso!' });
  }
  catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getProfiles,
  addProfile,
  updateProfile,
  deleteProfile
}
