<?php

namespace App\Controller;

use App\Entity\JsonOrder;
use App\Form\JsonOrderType;
use App\Repository\JsonOrderRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/order')]
class JsonOrderController extends AbstractController
{
    #[Route('/', name: 'app_json_order_index', methods: ['GET'])]
    public function index(JsonOrderRepository $jsonOrderRepository): Response
    {
        return $this->render('json_order/index.html.twig', [
            'json_orders' => $jsonOrderRepository->findAll(),
        ]);
    }

    #[Route('/order/new', name: 'app_json_order_new', methods: ['GET', 'POST'])]
    public function new(Request $request, EntityManagerInterface $entityManager): Response
    {
        $jsonOrder = new JsonOrder();
        $form = $this->createForm(JsonOrderType::class, $jsonOrder);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $entityManager->persist($jsonOrder);
            $entityManager->flush();

            return $this->redirectToRoute('app_json_order_index', [], Response::HTTP_SEE_OTHER);
        }

        return $this->renderForm('json_order/new.html.twig', [
            'json_order' => $jsonOrder,
            'form' => $form,
        ]);
    }

    #[Route('/order/{id}', name: 'app_json_order_show', methods: ['GET'])]
    public function show(JsonOrder $jsonOrder): Response
    {
        return $this->render('json_order/show.html.twig', [
            'json_order' => $jsonOrder,
        ]);
    }

    #[Route('/order/{id}/edit', name: 'app_json_order_edit', methods: ['GET', 'POST'])]
    public function edit(Request $request, JsonOrder $jsonOrder, EntityManagerInterface $entityManager): Response
    {
        $form = $this->createForm(JsonOrderType::class, $jsonOrder);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $entityManager->flush();

            return $this->redirectToRoute('app_json_order_index', [], Response::HTTP_SEE_OTHER);
        }

        return $this->renderForm('json_order/edit.html.twig', [
            'json_order' => $jsonOrder,
            'form' => $form,
        ]);
    }

    #[Route('/order/{id}', name: 'app_json_order_delete', methods: ['POST'])]
    public function delete(Request $request, JsonOrder $jsonOrder, EntityManagerInterface $entityManager): Response
    {
        if ($this->isCsrfTokenValid('delete' . $jsonOrder->getId(), $request->request->get('_token'))) {
            $entityManager->remove($jsonOrder);
            $entityManager->flush();
        }

        return $this->redirectToRoute('app_json_order_index', [], Response::HTTP_SEE_OTHER);
    }
}
