import React, { useState } from "react";
import { generateAdvice } from "../../../../services/geminiService";
import clients from "../../../../data/clientMock.json";
import products from "../../../../data/productMock.json";
import coupons from "../../../../data/couponMock.json";

const AdviceGenerator: React.FC = () => {
    const [advice, setAdvice] = useState<string | undefined>("");
    const [loading, setLoading] = useState<boolean>(false);

    const handleGenerateAdvice = async () => {
        setLoading(true);

        const prompt = `
  Genera mensajes promocionales para una campaña en redes sociales usando el siguiente formato:

  - **Título**: Título breve y atractivo.
  - **Motivo**: Razón de la promoción.
  - **Producto Destacado**: Menciona un producto relevante.
  - **Descuento**: Incluye un código de descuento si está disponible.
  - **Llamado a la Acción**: Frase que anime al usuario a tomar acción.
  - **Urgencia**: Añade una sensación de urgencia para incentivar la compra.

  Productos disponibles: ${products.map((p) => p.name).join(", ")}. 
  Clientes destacados: ${clients.map((c) => c.name).join(", ")}. 
  Códigos de descuento disponibles: ${coupons.map((c) => c.code).join(", ")}.
  
  Por favor, estructura cada mensaje de forma que sea adecuado para publicaciones en Instagram, Facebook y WhatsApp, manteniendo un tono amigable y cercano al público.
`;


        const generatedText = await generateAdvice(prompt);
        setAdvice(generatedText);
        setLoading(false);
    };

    return (
        <div className="p-8 bg-gray-100 min-h-screen">
            <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">Generador de Consejos Promocionales</h1>

            <div className="text-center mb-6">
                <button
                    onClick={handleGenerateAdvice} disabled={loading}
                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg shadow-md transition duration-300"
                >
                    {loading ? "Generando..." : "Generar Consejo"}
                </button>
            </div>
            {advice && (
                <div className="bg-white shadow-md rounded-lg p-6">
                    <h3 className="text-2xl font-semibold mb-4 text-gray-800">Resultado:</h3>
                    <p className="text-gray-700 whitespace-pre-wrap">{advice}</p>
                </div>

            )}
        </div>
    );
};

export default AdviceGenerator;
