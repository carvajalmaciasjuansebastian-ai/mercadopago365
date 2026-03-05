const express = require("express");
const cors = require("cors");
const { MercadoPagoConfig, Preference } = require("mercadopago");

const app = express();
app.use(express.json());
app.use(cors());

// CONFIGURA TUS CREDENCIALES AQUÍ
const client = new MercadoPagoConfig({ 
    accessToken: "TU_ACCESS_TOKEN_AQUI" // Usa tu Access Token de Producción
});

app.post("/create_preference", async (req, res) => {
    try {
        const preference = new Preference(client);
        const result = await preference.create({
            body: {
                items: req.body.items,
                back_urls: {
                    success: "https://auraluxuryperfumes.netlify.app",
                    failure: "https://auraluxuryperfumes.netlify.app",
                },
                auto_return: "approved",
            },
        });
        res.json({ id: result.id });
    } catch (error) {
        res.status(500).json({ error: "Error al crear la preferencia" });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor listo en puerto ${PORT}`));