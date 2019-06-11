export class ProductDetail {
    image: string;
    title: string;
    benefitHeader: string;
    benefits: ProductBenefits[];
    description: string[];
    online: boolean;
}

export class ProductBenefits {
    icon: string;
    text: string;
}