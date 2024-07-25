<?php

namespace App\Entity;

use App\Repository\UserSessionRepository;
use Doctrine\ORM\Mapping as ORM;


/**
 * UserSession
 *
 * @ORM\Table(name="user_session")
 * @ORM\Entity
 */

class UserSession
{
    /**
     * @var int
     *
     * @ORM\Column(name="id", type="integer", nullable=false)
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="IDENTITY")
     */
    private $id;

    /**
     * @ORM\OneToOne(targetEntity="App\Entity\User")
     * @ORM\JoinColumn(nullable=false)
     */
    private $user;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $sessionToken;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function setUser( $user): self
    {
        $this->user = $user;

        return $this;
    }

    public function setSessionToken( $sessionToken): self
    {
        $this->sessionToken = $sessionToken;

        return $this;
    }
}

