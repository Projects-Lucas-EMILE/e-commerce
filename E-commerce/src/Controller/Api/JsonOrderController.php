<?php

namespace App\Controller\Api;

use App\Entity\JsonOrder;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;


class JsonOrderController extends AbstractController
{
    /**
     * @Route("/order/api", methods={"POST"})
     */
    public function createJsonOrder(Request $request, EntityManagerInterface $entityManager): JsonResponse
    {
        $jsonData = $request->getContent();

        // Create a new JsonOrder entity
        $jsonOrder = new JsonOrder();
        $jsonOrder->setData(json_decode($jsonData, true)); // Convert JSON string to array

        // Persist the entity
        $entityManager->persist($jsonOrder);
        $entityManager->flush();

        return $this->json(['message' => 'JsonOrder created successfully'], 201);
    }
}
