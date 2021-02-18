import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.page.html',
  styleUrls: ['./faq.page.scss'],
})
export class FaqPage implements OnInit {
public items: any = [];
itemHeight: number = 0;
  constructor() {this.items = [
    { expanded: false, title: 'Qu’est ce Dépanne Dakar ?', text: 'Dépanne Dakar n’est pas une entreprise de nettoyage. Nous sommes une application qui aide à mettre en relation des expatriés vivant à Dakar avec des nettoyeurs indépendants. Grâce à Dépanne Dakar, vous pouvez réserver une aide-ménagère en moins 3 minutes.' },
	{ expanded: false, title: 'Puis-je réserver une aide-ménagère sur le site ?', text: 'Nous travaillons pour mettre à disposition cette option. Pour l’heure les réservations ne se demandent que sur l’application, que vous pouvez télécharger gratuitement' },	
	{ expanded: false, title: 'Comment ça marche ?', text: 'Pour utiliser Dépanne Dakar, il vous faut télécharger l’application gratuitement sur Android ou iOs. Une réservation sur Dépanne Dakar fonctionne en 4 étapes. 1. Vous choisissez la date et l’heure du rendez-vous 2. Vous sélectionner votre quartier. 3. Vous choisissez le service à effectuer. 4. Vous effectuez le paiement. Le tout prend environ 3 minutes. Pour l’instant seul le service nettoyage est disponible.' },
	{ expanded: false, title: 'Comment les nettoyeurs se protègent-ils et protègent-ils leurs clients pendant la Covid-19 ?', text: 'Il est conseillé aux prestataires de porter un masque respiratoire et des gants pendant des rendez-vous de nettoyage. Ils ont également été encouragés à annuler les rendez-vous de nettoyage au cas où ils auraient des symptômes du coronavirus. Un protocole Covid-19, comprenant toutes les mesures barrières, leur a également été communiqué.' },
	  { expanded: false, title: "Que dois-je faire avant l'arrivée de mon nettoyeur ?", text: "Il est recommandé de faire une liste de priorités de nettoyage pour votre aide-ménagère. Cela l'aidera à se concentrer sur les zones qui sont importantes pour vous. À l'arrivée de votre femme de ménage, faites-lui faire un tour et mettez en évidence vos priorités ainsi que les surfaces ou objets fragiles. N'oubliez pas de lui montrer où se trouvent vos produits de nettoyage et si vous avez des préférences ou des surfaces qui nécessitent des soins particuliers, faites-le savoir à votre femme de ménage." },	  
	   { expanded: false, title: 'Dois-je fournir des produits de nettoyage ?', text: 'Oui. Vous devez fournir les produits de nettoyage : aspirateur ou balai, serpillière avec un seau, détergent universel, nettoyant pour vitres, virucide ou bactéricide, nettoyant pour toilettes, chiffons ou éponges. Pour des raisons d’hygiène durable, nous vous encourageons à utiliser des produits biodégradables.' },	
	   	 { expanded: false, title: "Dois-je être à la maison pendant le nettoyage ?", text: "Nous vous recommandons vivement d'être à la maison pour afin de faire visiter votre logement à votre aide-ménagère. Certains clients choisissent de donner une clé de rechange à leur nettoyeur, mais cette décision vous revient. Dépanne Dakar dégage toute responsabilité au cours de l’échange des clés." },	
		 { expanded: false, title: 'Comment se fait le paiement ?', text: 'Le paiement se fait uniquement par voie électronique. Nous acceptons les paiements via PayPal, MasterCard, Visa et Maestro. Etant une entreprise qui se veut au cœur de la digitalisation, nous acceptons également les paiements par Bitcoin.' },
		{ expanded: false, title: "Puis-je annuler ma réservation ?", text: "Oui bien sûr. Pour annuler un rendez-vous, veuillez-vous connecter à votre profil, sélectionner le rendez-vous à annuler dans la liste des rendez-vous à venir et choisir 'Annuler'. Vous serez amené à indiquer le motif de l'annulation. Veuillez noter que les annulations effectuées 24 heures avant le rendez-vous peuvent entraîner des frais d'annulation." },
		{ expanded: false, title: 'Est-ce sûr de réserver avec Dépanne Dakar ?', text: 'Tous les prestataires de notre plateforme ont fourni un casier judiciaire vierge datant de moins de trois mois en plus de la copie de leur pièce d’identité. Nous vous conseillons de vérifier l’identité des prestataires avant le début de la prestation. Les aide-ménagères sont priées de se rendre sur les lieux de réservation, munis de leurs cartes d’identité.' },
		{ expanded: false, title: 'Combien ça coûte ?', text: 'Les prix sont fixés en fonction des heures de réservation. Vous pouvez réserver une aide-ménagère entre 9 H et 18 H. Une heure de réservation est à fixée à 5.000 frs, environ 7 euros. Plus de la moitié de cette somme est versée au prestataire. Si vous choisissez notre offre mensuelle (4 fois par mois), une réduction de 25% sera aménagée sur le prix global.' },	
		{ expanded: false, title: 'Comment nous contacter ?', text: 'Dans votre tableau de bord de l’application, vous avez accès à une assistance virtuelle. L’assistance virtuelle est reliée à notre compte WhatsApp.' }	 	 	  
    ];
	}

  ngOnInit() {
  }
  
   expandItem(item): void {
    if (item.expanded) {
      item.expanded = false;
    } else {
      this.items.map(listItem => {
        if (item == listItem) {
          listItem.expanded = !listItem.expanded;
        } else {
          listItem.expanded = false;
        }
        return listItem;
      });
    }
  }

}
