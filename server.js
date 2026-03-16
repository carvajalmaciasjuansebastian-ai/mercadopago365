const express = require("express");
const cors = require("cors");
const { MercadoPagoConfig, Preference } = require("mercadopago");

const app = express();
app.use(express.json());
app.use(cors());

// El Access Token se configurará en las variables de entorno de Render
const client = new MercadoPagoConfig({ 
    accessToken: process.env.MP_ACCESS_TOKEN 
});

app.post("/create_preference", async (req, res) => {
    try {
        const preference = new Preference(client);
        const result = await preference.create({
            body: {
                items: req.body.items,
                back_urls: {
                    // Actualizado a tu nueva dirección de Netlify
                    success: "https://chrono365.netlify.app",
                    failure: "https://chrono365.netlify.app",
                    pending: "https://chrono365.netlify.app"
                },
                auto_return: "approved",
            },
        });
        res.json({ id: result.id });
    } catch (error) {
        console.error("Error MP:", error);
        res.status(500).json({ error: "Error al crear la preferencia" });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor de CHRONOS corriendo en puerto ${PORT}`));
