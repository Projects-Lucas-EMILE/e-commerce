<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20230727084116 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE AdminUser (id INT AUTO_INCREMENT NOT NULL, username VARCHAR(255) NOT NULL, password TEXT NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE messenger_messages (id BIGINT AUTO_INCREMENT NOT NULL, body LONGTEXT NOT NULL, headers LONGTEXT NOT NULL, queue_name VARCHAR(190) NOT NULL, created_at DATETIME NOT NULL, available_at DATETIME NOT NULL, delivered_at DATETIME DEFAULT NULL, INDEX IDX_75EA56E0FB7336F0 (queue_name), INDEX IDX_75EA56E0E3BD61CE (available_at), INDEX IDX_75EA56E016BA31DB (delivered_at), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('DROP INDEX name ON category');
        $this->addSql('ALTER TABLE image CHANGE product_id product_id INT DEFAULT NULL');
        $this->addSql('DROP INDEX name ON product');
        $this->addSql('ALTER TABLE product CHANGE category_id category_id INT DEFAULT NULL, CHANGE sub_category_id sub_category_id INT DEFAULT NULL, CHANGE views views INT NOT NULL, CHANGE stock stock INT NOT NULL');
        $this->addSql('DROP INDEX name ON sub_category');
        $this->addSql('ALTER TABLE sub_category CHANGE category_id category_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE user CHANGE status status INT NOT NULL');
        $this->addSql('ALTER TABLE user_adress CHANGE user_id user_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE user_bag CHANGE user_id user_id INT DEFAULT NULL, CHANGE product_id product_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE user_payment_information CHANGE user_id user_id INT DEFAULT NULL');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('DROP TABLE AdminUser');
        $this->addSql('DROP TABLE messenger_messages');
        $this->addSql('CREATE UNIQUE INDEX name ON category (name)');
        $this->addSql('ALTER TABLE image CHANGE product_id product_id INT NOT NULL');
        $this->addSql('ALTER TABLE product CHANGE category_id category_id INT NOT NULL, CHANGE sub_category_id sub_category_id INT NOT NULL, CHANGE views views INT DEFAULT 0 NOT NULL, CHANGE stock stock INT DEFAULT 0 NOT NULL');
        $this->addSql('CREATE UNIQUE INDEX name ON product (name)');
        $this->addSql('ALTER TABLE sub_category CHANGE category_id category_id INT NOT NULL');
        $this->addSql('CREATE UNIQUE INDEX name ON sub_category (name)');
        $this->addSql('ALTER TABLE user CHANGE status status INT DEFAULT 0 NOT NULL');
        $this->addSql('ALTER TABLE user_adress CHANGE user_id user_id INT NOT NULL');
        $this->addSql('ALTER TABLE user_bag CHANGE user_id user_id INT NOT NULL, CHANGE product_id product_id INT NOT NULL');
        $this->addSql('ALTER TABLE user_payment_information CHANGE user_id user_id INT NOT NULL');
    }
}
