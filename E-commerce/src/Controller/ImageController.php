<?php


namespace App\Controller;

use App\Entity\Image;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\BinaryFileResponse;
use Symfony\Component\Routing\Annotation\Route;

class ImageController extends AbstractController
{
    /**
     * @Route("/image/{id}", name="app_image_show", methods={"GET"})
     */
    public function show(Image $image): BinaryFileResponse
    {
        // Replace '/tmp/' with the actual directory where the images are stored
        $imagePath = '/tmp/' . $image->getImage();

        return new BinaryFileResponse($imagePath);
    }
}
