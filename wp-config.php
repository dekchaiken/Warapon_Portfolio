<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the installation.
 * You don't have to use the web site, you can copy this file to "wp-config.php"
 * and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * Database settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://wordpress.org/documentation/article/editing-wp-config-php/
 *
 * @package WordPress
 */

// ** Database settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define( 'DB_NAME', 'wordpress' );

/** Database username */
define( 'DB_USER', 'wordpress' );

/** Database password */
define( 'DB_PASSWORD', 'Ken2543za#' );

/** Database hostname */
define( 'DB_HOST', 'localhost' );

/** Database charset to use in creating database tables. */
define( 'DB_CHARSET', 'utf8mb4' );

/** The database collate type. Don't change this if in doubt. */
define( 'DB_COLLATE', '' );

/**#@+
 * Authentication unique keys and salts.
 *
 * Change these to different unique phrases! You can generate these using
 * the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}.
 *
 * You can change these at any point in time to invalidate all existing cookies.
 * This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define( 'AUTH_KEY',         'e!QD FDa7htl9C7BpCh,(R<&P<HRNl,AZ<y)(x :KP6a^M^HP!u8n^k`/xn!;0F:' );
define( 'SECURE_AUTH_KEY',  '%I- 98|FD}7zd:mh*CjhNsat.Jf!ArQkjvd{1UNwQJzmkUiDWov;Ng4xgzhK-s-j' );
define( 'LOGGED_IN_KEY',    'T^/GOR!7U7~F;vJ6K0g,hl?T{l~10dz4tve!w[UXa*i_$ j_C8v*NE{wcC{U:)6I' );
define( 'NONCE_KEY',        'OBRr>sZ`]:**!FH(EYW*LZA1L/)*Ug_3%=efC)Sn631:rm^DvlF<b=.qYOoqKBq-' );
define( 'AUTH_SALT',        'Uz12$nm wRr1E/n;1odJicCXVebKb >%kf3xZOcxHn^bVK0*Nm)Jv^rUhPw:Xp1,' );
define( 'SECURE_AUTH_SALT', 'vij&nF=q:)TSUp&~CI6}z#I1Fsd-O#I>aFPLh0rg(wZP;9VjEcpC)OS*{Z*Cbj)*' );
define( 'LOGGED_IN_SALT',   '3E;1s}?8hvdm]t{*+Pkj((</EHjK?nJmAi#=Ce5CnTVq9g(96EW]LF$pl]aNAm0$' );
define( 'NONCE_SALT',       'P`)6|`P)XA~kwH:H-2N2gl%`cuANXmqHA-)~zr:-/Fwd`8oGo&`b.kpFLi:}#IBf' );

/**#@-*/

/**
 * WordPress database table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix = 'wp_';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the documentation.
 *
 * @link https://wordpress.org/documentation/article/debugging-in-wordpress/
 */
define( 'WP_DEBUG', false );

/* Add any custom values between this line and the "stop editing" line. */



/* That's all, stop editing! Happy publishing. */

/** Absolute path to the WordPress directory. */
if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', __DIR__ . '/' );
}

/** Sets up WordPress vars and included files. */
require_once ABSPATH . 'wp-settings.php';
