<?php

namespace App\Form\DataTransformer;

use App\Entity\Image;
use Symfony\Component\Form\DataTransformerInterface;
use Symfony\Component\HttpFoundation\File\UploadedFile;

class ImageTransformer implements DataTransformerInterface
{
    public function transform($images)
    {
        // Transform the collection of Image entities to an array of UploadedFile objects
        return $images;
    }

    public function reverseTransform($uploadedFiles)
    {
        $images = [];

        // Loop through the UploadedFile objects and create Image entities
        foreach ($uploadedFiles as $uploadedFile) {
            $image = new Image();
            $image->setImage($uploadedFile); // This will handle the file upload and move it to the new directory
            $images[] = $image;
        }

        return $images;
    }
}
