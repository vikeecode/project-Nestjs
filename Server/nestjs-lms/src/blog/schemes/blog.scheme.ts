
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
export type BlogDocument = HydratedDocument<Blog>;

export class Blog {
    @Prop({ required: true })
    title?: string;

    @Prop({ required: true })
    content?: string;   

    @Prop({ required: true, unique: true })
    slug?: string;

    @Prop({ required: true })
    image?: string;

    @Prop({ required: true })
    author?: string;

    @Prop({ required: true })
    createdAt?: Date;

    @Prop({ required: true })
    updatedAt?: Date;

    @Prop({ required: true })
    Tags?: string[];

    @Prop({ required: true })
    BlogType?: string;
    
    @Prop({ required: true })
    status?: string;
}

const BlogScheme = SchemaFactory.createForClass(Blog);
