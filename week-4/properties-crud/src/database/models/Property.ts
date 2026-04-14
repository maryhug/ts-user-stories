import mongoose, { Schema, Document, Model, Types } from "mongoose";

// ----------------------------------------------------------
// Interface TypeScript para tipado fuera de Mongoose
// (por ejemplo, en los servicios y componentes React)
// ----------------------------------------------------------
export interface IProperty {
    _id?: string | Types.ObjectId;
    name: string;
    value: number;
    img?: string;
    createdAt?: Date;
    updatedAt?: Date;
}

// ----------------------------------------------------------
// Interface del documento Mongoose (extiende Document)
// ----------------------------------------------------------
interface IPropertyDocument extends Document {
    name: string;
    value: number;
    img?: string;
    createdAt?: Date;
    updatedAt?: Date;
}

// ----------------------------------------------------------
// Schema — define estructura, tipos y validaciones
// ----------------------------------------------------------
const PropertySchema = new Schema<IPropertyDocument>(
    {
        name: {
            type: String,
            required: [true, "El nombre de la propiedad es obligatorio"],
            trim: true,
            minlength: [2, "El nombre debe tener al menos 2 caracteres"],
        },
        value: {
            type: Number,
            required: [true, "El valor de la propiedad es obligatorio"],
            min: [0, "El valor no puede ser negativo"],
        },
        img: {
            type: String,
            default: "",
            trim: true,
        },
    },
    { timestamps: true }
);

// ----------------------------------------------------------
// Model — usamos el patrón de seguridad para Next.js
// ----------------------------------------------------------
const Property: Model<IPropertyDocument> =
    mongoose.models.Property ||
    mongoose.model<IPropertyDocument>("Property", PropertySchema);

export default Property;
