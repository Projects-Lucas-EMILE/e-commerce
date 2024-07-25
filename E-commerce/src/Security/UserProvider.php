<?php
// src/Security/UserProvider.php

namespace App\Security;

use App\Entity\AdminUser;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Security\Core\Exception\UserNotFoundException;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Security\Core\User\UserProviderInterface;

class UserProvider implements UserProviderInterface
{
    private $entityManager;

    public function __construct(EntityManagerInterface $entityManager)
    {
        $this->entityManager = $entityManager;
    }

    public function loadUserByIdentifier(string $username): UserInterface
    {
        $userRepository = $this->entityManager->getRepository(AdminUser::class);
        $user = $userRepository->findOneBy(['username' => $username]);

        if (!$user) {
            throw new UserNotFoundException('User not found for the given identifier.');
        }

        // Make sure your AdminUser entity implements UserInterface
        return $user;
    }

    public function loadUserByUsername(string $username): UserInterface
    {
        // You can also implement the loadUserByUsername method if needed
        // It is called in older Symfony versions or if you're using a different configuration in security.yaml
        // Make sure your AdminUser entity implements UserInterface
        return $this->loadUserByIdentifier($username);
    }

    public function refreshUser(UserInterface $user): UserInterface
    {
        // If your user entity uses some form of caching or you need to reload additional user data
        // you can implement the refreshUser method here
        return $user;
    }

    public function supportsClass(string $class): bool
    {
        // Check if your UserProvider supports the given class (usually a user entity class)
        return $class === AdminUser::class;
    }
}
