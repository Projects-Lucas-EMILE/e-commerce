<?php
// src/Form/ProductType.php

namespace App\Form;

use App\Entity\Product;
use App\Form\DataTransformer\ImageTransformer;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\FileType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class ProductType extends AbstractType
{
    private $imageTransformer;

    public function __construct(ImageTransformer $imageTransformer)
    {
        $this->imageTransformer = $imageTransformer;
    }

    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        $builder
            ->add('name')
            ->add('description')
            ->add('price')
            ->add('features')
            ->add('views')
            ->add('stock')
            ->add('status')
            ->add('weight')
            ->add('category')
            ->add('discount')
            ->add('subCategory')
            ->add('images', FileType::class, [
                'label' => 'Images',
                'required' => false,
                'multiple' => true,
                'attr' => ['accept' => 'image/*'],
            ]);

        // Add the data transformer to handle image uploads
        $builder->get('images')->addModelTransformer($this->imageTransformer);
    }

    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            'data_class' => Product::class,
        ]);
    }
}
