<?php

namespace App\Controller;

use App\Entity\UserBag;
use App\Form\UserBagType;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/user/bag')]
class UserBagController extends AbstractController
{
    #[Route('/', name: 'app_user_bag_index', methods: ['GET'])]
    public function index(EntityManagerInterface $entityManager): Response
    {
        $userBags = $entityManager
            ->getRepository(UserBag::class)
            ->findAll();

        return $this->render('user_bag/index.html.twig', [
            'user_bags' => $userBags,
        ]);
    }

    #[Route('/new', name: 'app_user_bag_new', methods: ['GET', 'POST'])]
    public function new(Request $request, EntityManagerInterface $entityManager): Response
    {
        $userBag = new UserBag();
        $form = $this->createForm(UserBagType::class, $userBag);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $entityManager->persist($userBag);
            $entityManager->flush();

            return $this->redirectToRoute('app_user_bag_index', [], Response::HTTP_SEE_OTHER);
        }

        return $this->renderForm('user_bag/new.html.twig', [
            'user_bag' => $userBag,
            'form' => $form,
        ]);
    }

    #[Route('/{id}', name: 'app_user_bag_show', methods: ['GET'])]
    public function show(UserBag $userBag): Response
    {
        return $this->render('user_bag/show.html.twig', [
            'user_bag' => $userBag,
        ]);
    }

    #[Route('/{id}/edit', name: 'app_user_bag_edit', methods: ['GET', 'POST'])]
    public function edit(Request $request, UserBag $userBag, EntityManagerInterface $entityManager): Response
    {
        $form = $this->createForm(UserBagType::class, $userBag);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $entityManager->flush();

            return $this->redirectToRoute('app_user_bag_index', [], Response::HTTP_SEE_OTHER);
        }

        return $this->renderForm('user_bag/edit.html.twig', [
            'user_bag' => $userBag,
            'form' => $form,
        ]);
    }

    #[Route('/{id}', name: 'app_user_bag_delete', methods: ['POST'])]
    public function delete(Request $request, UserBag $userBag, EntityManagerInterface $entityManager): Response
    {
        if ($this->isCsrfTokenValid('delete'.$userBag->getId(), $request->request->get('_token'))) {
            $entityManager->remove($userBag);
            $entityManager->flush();
        }

        return $this->redirectToRoute('app_user_bag_index', [], Response::HTTP_SEE_OTHER);
    }
}
