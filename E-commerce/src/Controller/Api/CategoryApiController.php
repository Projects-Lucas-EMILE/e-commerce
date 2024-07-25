<?php

namespace App\Controller\Api;

use App\Entity\Category;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

class CategoryApiController extends AbstractController
{
    #[Route('/category/api', name: 'app_category_api', methods: ['GET'])]
public function getAllCategories(Request $request, EntityManagerInterface $entityManager)
    {
    // Get the query parameters from the request
    $itemsPerPage = $request->query->getInt('item', 10);
    $currentPage = $request->query->getInt('page', 1);

    // Calculate the offset to paginate the results
    $offset = ($currentPage - 1) * $itemsPerPage;

    // Get the categories based on the pagination settings
    $categories = $entityManager->getRepository(Category::class)
        ->findBy([], null, $itemsPerPage, $offset);

    // Create the JsonResponse with the array of categories
    return new JsonResponse($this->serializeCategories($categories), 200);
}

#[Route('/category/api/{id}', name: 'app_category_detail', methods: ['GET'])]
function getCategoryDetail(int $id, EntityManagerInterface $entityManager)
    {
    // Get the category based on the given ID
    $category = $entityManager->getRepository(Category::class)->find($id);

    // Check if the category exists
    if (!$category) {
        // Return a JSON response indicating that the category was not found
        return new JsonResponse(['error' => 'Category not found'], 404);
    }

    // Create the JsonResponse with the single category
    return new JsonResponse($this->serializeCategory($category), 200);
}

// Helper method to serialize a single category
function serializeCategory(Category $category)
    {
    $subCategories = [];
    foreach ($category->getSubCategories() as $subCategory) {
        $subCategories[] = [
            'id' => $subCategory->getId(),
            'name' => $subCategory->getName(),
            // Add any other properties you want to include for subcategories
        ];
    }

    $data = [
        'id' => $category->getId(),
        'name' => $category->getName(),
        'subCategories' => $subCategories,
        // Add any other properties you want to include for categories
    ];

    return $data;
}

// Helper method to serialize an array of categories
function serializeCategories(array $categories)
    {
    $serializedCategories = [];
    foreach ($categories as $category) {
        $serializedCategories[] = $this->serializeCategory($category);
    }

    return $serializedCategories;
}
}
